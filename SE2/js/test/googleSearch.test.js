const gs = require('./google-search');

describe('Get the wikipedia url of the entety searched', () => {
    it('should return string', () => {
        return gs.googlesearch('James D\'Arcy')
            .then(data => {
                expect(data).toEqual(['James D\'Arcy','James_D\'Arcy'])
            })
    })
});

