let start = String(new Date(2018, 1, 18));
let end = String(new Date(2019, 3, 32));

export const experiences = [
	{ id: 1,  name: 'abcd', title: 'def', start: start, end: end }
];

export const skills = [
	{ name: 'abc', years: '3' },
	{ name: 'def', years: '4' }
];

export const comments = [
	{ id: 1, content: 'abc' }
];

export const projects = [
	{ id: 1, name: 'A', description: "a", start: start, end: end, demo_link: "abc", github_link: "def" },
	{ id: 2, name: 'B', description: "b", start: start, end: end, demo_link: "ghi", github_link: "jkl" },
]

export const screenshots = [
	{ id: 1, name: "abcd", image_data: "https://picsum.photos/1280/720" }
]

export const contact = [
	{ first_name: 'abcd', last_name: 'efgh', email: 'a@b.com', message: 'Hi' }
]
