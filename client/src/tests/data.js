let start = String(new Date(2018, 1, 18));
let end = String(new Date(2019, 3, 32));

export const experience = { 
	id: 1, 
	name: 'abcd',
	title: 'def', 
	start: start,
	end: end
};

export const skills = [
	{ name: 'abc', years: '3' },
	{ name: 'def', years: '4' }
];

export const comments = [
	{ content: 'abc' }
];

export const projects = [
	{ id: 1, description: "a", start: start, end: end, demo_link: "abc", github_link: "def" },
	{ id: 2, description: "b", start: start, end: end, demo_link: "ghi", github_link: "jkl" },
]

export const screenshots = [
	{ name: "abcd", img: "abcd" }
]
