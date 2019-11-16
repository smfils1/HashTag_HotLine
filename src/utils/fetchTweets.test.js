const Twit = require("twit");
import fetchTwitter from "./fetchTweets";
import fakeTwitter from "./fetchTweets";

const expectedData = [
    {
        post_date_creation: "Fri Nov 15 23:41:42 +0000 2019",
        post_id: "1195487067985371136",
        post: "#testing_hth testing 2",
        hashtags: ["testing_hth"],
        user_id: "1187559230414434304",
        username: "HashTagHotline",
        location: {
            longitude: -73.93049282607896,
            latitude: 40.65323183619257
        }
    },
    {
        post_date_creation: "Fri Nov 15 22:50:28 +0000 2019",
        post_id: "1195474173390446592",
        post: "#testing_hth this is a test",
        hashtags: ["testing_hth"],
        user_id: "1187559230414434304",
        username: "HashTagHotline",
        location: {
            longitude: -74.041878,
            latitude: 40.570842
        }
    }
];

it("fetches nothing from twitter when receiving no hashtag", async () => {
    let jsonData = await fetchTwitter();
    expect(jsonData.length).toBe(0);
    expect(Twit.prototype.get).toHaveBeenCalledTimes(0);
});

