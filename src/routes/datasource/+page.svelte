<script lang="ts">
    import * as Card from '$lib/components/ui/card'
    import type { PageServerData } from './$types'

    export let data: PageServerData
</script>

{#each data.datasources as datasource}
    <a href={`/datasource/${datasource.id}`}>
        <Card.Root>
            <Card.Header>
                <Card.Title>Source: {datasource.provider}</Card.Title>
            </Card.Header>
            <Card.Content>
                <p>Host: {datasource.host}</p>
                <p>Port: {datasource.port}</p>
                <p>Username: {datasource.username}</p>
            </Card.Content>
        </Card.Root>
    </a>
{/each}
