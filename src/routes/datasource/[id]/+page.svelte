<script lang="ts">
    import type { PageServerData } from './$types'
    import * as Table from '$lib/components/ui/table'
    import { Button } from '$lib/components/ui/button'
    import { invalidate, invalidateAll } from '$app/navigation'

    export let data: PageServerData

    $: databaseList = data.databaseList

    function createDatabase() {
        fetch('/database/create', {
            method: 'POST',
            body: JSON.stringify({
                id: data.sourceId,
            }),
        }).then(() => {
            invalidateAll()
        })
    }

    function deleteDatabase(name: string) {
        fetch('/database/delete', {
            method: 'POST',
            body: JSON.stringify({
                dbName: name,
            }),
        }).then(() => {
            invalidateAll()
        })
    }
</script>

<div>
    <Button on:click={createDatabase} data-sveltekit-reload
        >Create new database</Button
    >
    {#if !databaseList}
        <div>No sources</div>
    {:else}
        <Table.Root>
            <Table.Caption
                >A list of your databases of source {data.sourceId}.</Table.Caption
            >
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">Database</Table.Head>
                    <Table.Head>User</Table.Head>
                    <Table.Head>Password</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each databaseList as database}
                    <Table.Row>
                        <Table.Cell>{database.username}</Table.Cell>
                        <Table.Cell>{database.database}</Table.Cell>
                        <Table.Cell>{database.password}</Table.Cell>
                        <Table.Cell>
                            <Button
                                on:click={() =>
                                    deleteDatabase(database.database)}
                                >Delete</Button
                            >
                        </Table.Cell>
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    {/if}
</div>
