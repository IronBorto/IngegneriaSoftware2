const dbp = require('./dbPediaSearch.js');
const result = require('./jamesdarcy');

describe('Return description of the query searched', () => {
    it('should return string', () => {
        return dbp.dbpedia('James_D\'Arcy')
            .then(data => {
                expect(data).toEqual(result.value)
            })
    })
});