import "isomorphic-unfetch";

import { allYourBase, getEmoji } from "../lib/emojilib.js";

it("returns a dog emoji when passed 'dog'", async () => {
    expect(await getEmoji("dog")).toEqual("🐶");
});

it("returns all of the emojis with the given base", async () => {
    expect(await allYourBase("sign_of_the_horns")).toEqual("🤘🤘🏼🤘🏽🤘🏾🤘🏿🤘🏻");
});
