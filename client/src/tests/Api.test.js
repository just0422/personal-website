import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import api from '../api';

import { projects, experiences, skills } from './data';

describe('Api Projects', () => {
	let mock;

	beforeEach(() => {
		mock = new MockAdapter(axios);
	});

	it ('should get all projects', () => {
		mock.onGet(api.projectsUrl).reply(200, projects);

		api.projects().getAll().then((response) => {
			expect(response.data).toEqual(projects);
		});
	});

	it ('should get all experiences', () => {
		mock.onGet(api.experiencesUrl).reply(200, experiences);

		api.experiences().getAll().then((response) => {
			expect(response.data).toEqual(experiences);
		});
	});

	it ('should get all skills', () => {
		mock.onGet(api.skillsUrl).reply(200, skills);

		api.skills().getAll().then((response) => {
			expect(response.data).toEqual(skills);
		});
	});
});
