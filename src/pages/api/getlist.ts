import type { APIRoute } from 'astro';
import type { InventoryItem } from '../../types/dbTypes';
import { turso } from '../../turso';

export const GET: APIRoute = async ({ params, request }) => {
    // const itemsResult = await turso.execute(
    // 	"SELECT * FROM inventory WHERE description NOT LIKE '%test%'"
    // );
    const itemsResult = await turso.execute('SELECT * FROM inventory;');
    const rows = itemsResult.rows as unknown as InventoryItem[];
    let res = [];

    for (let row of rows) {
        const quick = Object.values(row).join(' - ');
        res.push(`<div>${quick}</div>`);
    }

    return new Response(res.join('\n'));
};
