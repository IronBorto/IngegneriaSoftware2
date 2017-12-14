const httpClient = require('./HttpClient');
const path = "./f49c85ab78c63fc0b766e02ee70cc164"

describe('Return result of the Google API Vision', () => {
    it('should return string', () => {
        return httpClient.googleAPIVision(path)
            .then(data => {
                expect(data).toEqual(['James D\'Arcy','',''])
            })
    })
});