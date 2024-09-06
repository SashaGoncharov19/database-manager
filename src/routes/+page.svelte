<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Select from '$lib/components/ui/select';

	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';

	const { data } = $props();

	const datasources = $state(data.datasources());

	$inspect($datasources.data);

	let newDatasourceData = $state({
		name: '',
		provider: {
			value: '',
			label: ''
		},
		username: '',
		password: '',
		host: '',
		port: 0
	});

	const providers = [
		{ value: 'mysql', label: 'MySQL' },
		{ value: 'postgresql', label: 'PostgreSQL' }
	];
</script>

<Card.Root>
	<div class="flex items-center justify-between">
		<Card.Header>Manage your data sources</Card.Header>
		<Card.Header>
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Add new</Dialog.Trigger>
				<Dialog.Content class="sm:max-w-[425px]">
					<Dialog.Header>Add new datasource</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Label class="text-right">Provider</Label>
							<Select.Root
								selected={newDatasourceData.provider}
								onSelectedChange={(v) => {
									v && (newDatasourceData.provider.value = v.value);
								}}
							>
								<Select.Trigger class="w-[275px]">
									<Select.Value placeholder="Select a provider" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										<Select.Label>Providers</Select.Label>
										{#each providers as provider}
											<Select.Item value={provider.value} label={provider.label}
												>{provider.label}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="favoriteFruit" />
							</Select.Root>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="name" class="text-right">Name</Label>
							<Input
								id="name"
								bind:value={newDatasourceData.name}
								placeholder="My Hetzner Datasource"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="user" class="text-right">User</Label>
							<Input
								id="user"
								bind:value={newDatasourceData.username}
								placeholder="root"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="password" class="text-right">Password</Label>
							<Input
								id="password"
								bind:value={newDatasourceData.password}
								placeholder="Passw0rd"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="host" class="text-right">Host</Label>
							<Input
								id="host"
								bind:value={newDatasourceData.host}
								placeholder="127.0.0.1"
								class="col-span-3"
							/>
						</div>
						<div class="grid grid-cols-4 items-center gap-4">
							<Label for="port" class="text-right">Port</Label>
							<Input
								id="port"
								bind:value={newDatasourceData.port}
								type="number"
								placeholder="5432"
								class="col-span-3"
							/>
						</div>
					</div>
					<Dialog.Footer>
						<!--						<Button onclick={createDatasource} type="submit">Save</Button>-->
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Card.Header>
	</div>
	<Card.Content>
		{#if $datasources.isFetching || $datasources.isPending}
			<div>Fetching information</div>
		{:else if $datasources.isError}
			<div>We got some errors</div>
		{:else if $datasources.data}
			{$datasources.data.json[0]}
		{/if}
	</Card.Content>
</Card.Root>
