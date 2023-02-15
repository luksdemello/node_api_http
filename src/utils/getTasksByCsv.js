import { createReadStream} from 'node:fs'
import { randomUUID } from 'node:crypto'
import { parse } from 'csv-parse';

const csvUrl = new URL('../tasks.csv', import.meta.url)

export async function getTasksByCsv(req, res) {
 const csvStream = createReadStream(csvUrl)
  
 const csvParse = parse({
  from_line: 2
 })

 const csvLines = csvStream.pipe(csvParse)

 const tasks = [];

 for await (const line of csvLines) {
  const [title, description] = line;
  
  const task = {
    id: randomUUID(),
    title,
    description,
    completed_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  }

  tasks.push(task)
 }

 return tasks
}