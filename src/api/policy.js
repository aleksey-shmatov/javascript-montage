export default class PolicyAPI {
	constructor(client) {
		this.client = client;
	}

	create(description, policy) {
		var payload = {
			description,
			policy
		};

		return this.client.request('policy/', 'POST', payload);
	}

	list() {
		return this.client.request('policy/');
	}

	get(policy_id) {
		return this.client.request(`policy/${policy_id}/`);
	}

	update(policy_id, description, policy) {
		if(!description && !policy) {
			throw new Error('Must provide a `description` or `policy`');
		}

		var payload = {};

		if(description) {
			payload.description = description;
		}

		if(policy) {
			payload.policy = policy;
		}

		if(payload) {
			return this.client.request(`policy/${policy_id}/`, 'PATCH', payload);
		}
	}

	remove(policy_id) {
		return this.client.request(`policy/${policy_id}/`, 'DELETE');
	}

	checkPermission(action, resource) {
		var payload = {
			action,
			resource
		};

		return this.client.request('policy/check/', 'GET', payload);
	}
}