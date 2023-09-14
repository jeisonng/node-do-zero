import { randomUUID } from "node:crypto";
import { sql } from "./db.js";


export class DatabasePostgres {

   async list(search) {
        if(search){
           return await sql`select * from videos where title ilike ${'%' +search + '%'}`;
        } else{
           return await sql`select * from videos`
        }
    }

   async create(video) {
        const videoId = randomUUID()
        const { title, descrition, duration } = video;
        await sql`insert into videos (id, title, descrition, duration) VALUES (${videoId},${title}, ${descrition}, ${duration})`
    }

   async update(id, video) {
        const { title, descrition, duration } = video;
        const databaseVideo = await sql`select * from videos where id=${id}`;
        const videoSelectd = databaseVideo[0];
        await sql`update videos set title=${title || videoSelectd.title}, descrition=${descrition || videoSelectd.descrition}, duration=${duration || videoSelectd.duration} WHERE id=${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }
}