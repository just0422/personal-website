import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import api from '../APIUtils';

import { projects, experience, skills } from './data';

describe('API Projects', () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it ('should get all projects', () => {
		mock.onGet(api.projectsPath).reply(200, projects);

		api.projects().getAll().then((response) => {
			expect(response.data).toEqual(projects);
		});
	});

	it('should get all skills association with projects[0]', () => {
		let id = projects[0]['id'];
		mock.onGet(`${api.projectsUrl}/${id}${api.skillsPath}`).reply(200, skills);

		api.projects().getSkills(id).then((response) => {
			expect(response.data).toEqual(skills);
		});
	});
});

describe('API Experiences', () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it ('should get all experiences', () => {
		mock.onGet(api.experiencesUrl).reply(200, experience);

		api.experiences().getAll().then((response) => {
			expect(response.data).toEqual(experience);
		});
	});

	it('should get all skills association with experiences[0]', () => {
		let id = experience['id'];
		mock.onGet(`${api.experiencesUrl}/${id}${api.skillsPath}`).reply(200, skills);

		api.experiences().getSkills(id).then((response) => {
			expect(response.data).toEqual(skills);
		});
	});
});

describe('API skills', () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it ('should get all skills', () => {
		mock.onGet(api.skillsUrl).reply(200, skills);

		api.skills().getAll().then((response) => {
			expect(response.data).toEqual(skills);
		});
	});
});
