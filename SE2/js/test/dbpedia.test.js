const dbp = require('./dbPediaSearch.js');
const result = require('./jamesdarcy');

describe('Return desciption of the query searced', () => {
    it('should return string', () => {
        return dbp.dbpedia('James_D\'Arcy')
            .then(data => {
                expect(data).toEqual(result.value)
            })
    })
});