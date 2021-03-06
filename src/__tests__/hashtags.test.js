import { API } from 'aws-amplify'
import { updateUserHashtag,
	getHashtagIdByName,
    getUserHashtags,
	createUserHashtag} from '../crud/hashtags'
import dbHashtags from '../testData/dbHashtags'


afterEach(() => {
	jest.clearAllMocks()
})



describe('createUserHashtag function', () => {
	it('Dont create hashtag if there is no hashName provided', async () => {
		const hashtag = await createUserHashtag(undefined, "749b2b0c-6f78-4592-b427-e222e1e9855c")
        expect(API.graphql).toHaveBeenCalledTimes(0)   
        expect(hashtag).toBe(undefined)     
    }) 
    it('Create hashtag if there is hashtagName', async () => {
		const hashtag = await createUserHashtag("name", "749b2b0c-6f78-4592-b427-e222e1e9855c")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(hashtag).toBe("name")          
    }) 
    it('Create hashtag given an name & no settingsId', async () => {
		const hashtag = await createUserHashtag("name")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(hashtag).toBe("name")         
    })
    
})

describe('getUserHashtags function', () => {
	it('Return no hashtags if none are created', async () => {
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: [] },
				},
			}),
		)
		const hashtags = await getUserHashtags()
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(hashtags).toEqual([])
    })
    
    it('Returns created hashtags formatted', async () => {
        const hashtagsData = dbHashtags.data.listHashtags.items
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: hashtagsData },
				},
			}),
		)
		const hashtags = await getUserHashtags()
		expect(API.graphql).toHaveBeenCalledTimes(1)
		expect(hashtags).toEqual([{  
            "id": "cb6302da-d528-491f-852c-6e082f528e9b",
            isInSettings: false,
            "isSearchable": true,
            "name": "mta_hth_test"
        },{
            "id": "8b673219-9e47-44f0-9e6b-9d857096785a",
            isInSettings: true,
            "isSearchable": true,
            "name": "accident_hth_test"
        }, {
            "id": "4170a407-7a03-4029-899d-f40d948e3905",
            "isInSettings": true,
            "isSearchable": true,
            "name": "mta_hth"
        }])
	})
})

describe('getHashtagIdByName function', () => {
    it('Returns no hashtagId if its name is not provided', async () => {
		const hashtagId = await getHashtagIdByName()
        expect(API.graphql).toHaveBeenCalledTimes(0)   
        expect(hashtagId).toBe(undefined)     
    }) 
	it('Returns no hashtagId if it cant find it', async () => {
        const hashtagsData = dbHashtags.data.listHashtags.items
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: hashtagsData },
				},
			}),
		)
		const hashtagId = await getHashtagIdByName("accident_hth")
        expect(API.graphql).toHaveBeenCalledTimes(1)   
        expect(hashtagId).toBe(undefined)     
    }) 
    it('Returns found hashtagId', async () => {
        const hashtagsData = dbHashtags.data.listHashtags.items
		API.graphql.mockImplementationOnce(() =>
			Promise.resolve({
				data: {
					listHashtags: { items: hashtagsData },
				},
			}),
		)
		const hashtagId = await getHashtagIdByName("accident_hth_test")
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(hashtagId).toBe("8b673219-9e47-44f0-9e6b-9d857096785a")          
    }) 
   
})

describe('updateUserHashtag function', () => {
	it('Dont update hashtag if there is no update provided', async () => {
		const updatedHashtag = await updateUserHashtag("749b2b0c-6f78-4592-b427-e222e1e9855c")
        expect(API.graphql).toHaveBeenCalledTimes(0)   
        expect(updatedHashtag).toBe(undefined)     
    }) 
    it('Dont update hashtag if there is no update id provided', async () => {
		const updatedHashtag = await updateUserHashtag({"name": "New"})
        expect(API.graphql).toHaveBeenCalledTimes(0) 
        expect(updatedHashtag).toBe(undefined)          
    }) 
    it('Create hashtag given an name & no settingsId', async () => {
		const updatedHashtag = await updateUserHashtag("749b2b0c-6f78-4592-b427-e222e1e9855c", {"name": "New"})
        expect(API.graphql).toHaveBeenCalledTimes(1) 
        expect(updatedHashtag).toEqual({id: "749b2b0c-6f78-4592-b427-e222e1e9855c", "name": "New"})         
    })
    
})