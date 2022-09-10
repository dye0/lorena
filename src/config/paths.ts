import { IN_ACTION_CUDDLE, IN_ACTION_KISS } from "./inAction";

export interface Art {
	url: string;
	hostname: string;
}

export interface IPath {
	message: (recieve: string | null, author: string | null) => string;
	embed: (recieve: string | null, author: string | null) => string;
	random(): Art;
	placeholders: string[];
}

export interface IPaths {
	readonly [key: string]: IPath;
}

const defaults = {
	author: "methiu",
	reciever: "lorena",
} as const;

const randomFromArray = (array: string[]) => array[Math.floor(Math.random() * array.length)];

const getRandomPath = (path: { [key: string]: { source: string; endpoints: string[] } }): Art => {
	const urlArr = Object.keys(path);
	const selectedUrl = randomFromArray(urlArr);
	const usableEndpoints = path[selectedUrl].endpoints;
	const randomEndpoint = randomFromArray(usableEndpoints);

	return { hostname: path[selectedUrl].source, url: `${selectedUrl}${randomEndpoint}` };
};

export const Paths = {
	"to-cuddle": {
		message(reciever, author) {
			return `hey ${reciever || defaults.reciever}, ${author || defaults.author} vrea sa va...uhh... imbrațișați!`;
		},
		embed(reciever, author) {
			return `hey${reciever ? ` ${reciever}` : ""}, vrei sa ne... imbrațișam? hehe!\n- ${author || defaults.author}`;
		},
		random: () =>
			getRandomPath({
				"https://nekos.life/api/v2/img/": { source: "https://nekos.life", endpoints: ["hug", "cuddle"] },
				"https://asuna.ga/api/": { source: "https://asuna.ga", endpoints: ["hug"] },
			}),
		placeholders: IN_ACTION_CUDDLE.map(({ url }) => url),
	},
	"to-kiss": {
		message(reciever, author) {
			return `hey lore, i wanna kiss u`;
		},
		embed(reciever, author) {
			return `Hey${reciever ? ` ${reciever}` : ""}, vrei sa ne.. pupăm???\n- ${author || defaults.author}`;
		},
		random: () =>
			getRandomPath({
				"https://nekos.life/api/v2/img/": { source: "https://nekos.life", endpoints: ["kiss"] },
				"https://asuna.ga/api/": { source: "https://asuna.ga", endpoints: ["kiss"] },
			}),
		placeholders: IN_ACTION_KISS.map(({ url }) => url),
	},
	"uhhh": {
		message(reciever, author) {
			return `hey lore, i wanna... do something else`;
		},
		embed(reciever, author) {
			return `Hey${reciever ? ` ${reciever}` : ""}, wanna share... something?\n- ${author || defaults.author}`;
		},
		random: () =>
			getRandomPath({
				"https://nekos.life/api/v2/img/": { source: "https://nekos.life", endpoints: ["slap"] },
				"https://asuna.ga/api/": { source: "https://asuna.ga", endpoints: ["slap"] },
			}),
		placeholders: IN_ACTION_KISS.map(({ url }) => url),
	},
} as IPaths;
