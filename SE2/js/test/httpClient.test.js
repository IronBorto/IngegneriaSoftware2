const httpClient = require('./HttpClient');
const result = require('./jamesdarcy');
const path = "./f49c85ab78c63fc0b766e02ee70cc164"

describe('Return desciption of the query searced', () => {
    it('should return string', () => {
        return httpClient.elaborate(path)
            .then(data => {
                expect(data).toEqual(['James D\'Arcy','',''])
            })
    })
});