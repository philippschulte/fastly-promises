const hash = require('object-hash');

/** Helper class with high-level operations for condition-management */
class Conditions {
  constructor(fastly) {
    this._fastly = fastly;
  }

  update(version, type, commentprefix, nameprefix) {
    return async (...statements) => {
      const jobs = [];
      const conditions = statements.map((statement) => {
        const hashable = {
          type,
          statement,
        };

        const name = `${nameprefix}-${hash(hashable)}`;
        const comment = `${commentprefix} (${hash(hashable)})`;

        return Object.assign({
          name,
          comment,
          priority: '10',
        }, hashable);
      });

      // generate a set of known names
      const conditionnames = new Set(conditions.map(({ name }) => name));

      const existing = (await this._fastly.readConditions(version)).data;

      // keep a list of known names in the remote service
      const existingnames = new Set(existing.map(({ name }) => name));
      const todelete = existing
        // only look at conditions that start with 'our' prefix
        .filter(({ name }) => name.startsWith(`${nameprefix}-`))
        // only keep those that are *not* in the list of generated names
        .filter(({ name }) => !conditionnames.has(name))
        // schedule each condition that exists on Fastly, but wasn't passed as
        // an argument for deletion
        .map(({ name }) => this._fastly.deleteCondition(version, name));

      jobs.push(...todelete);

      const tocreate = conditions
        // only consider conditions that don't exist in the remote service
        .filter(({ name }) => !existingnames.has(name))
        // schedule each condition that does not yet exist on Fastly
        // but was passed as an argument to be created
        .map(condition => this._fastly.createCondition(version, condition));

      jobs.push(...tocreate);
      await Promise.all(jobs);

      // create a lookup map that takes the statement as key and returns the condition
      // as value

      return conditions.reduce((p, condition) => {
        const q = {};
        q[condition.statement] = condition;
        return Object.assign(p, q);
      }, {});
    };
  }
}

module.exports = Conditions;
