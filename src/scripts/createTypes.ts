import { generateNamespace } from '@gql2ts/from-schema';
import * as fs from 'fs';
import { genSchemas } from '../utils/genSchemas';
import * as path from 'path';

 
const typescriptTypes = generateNamespace('GQL', genSchemas());
fs.writeFile(path.join(__dirname, '../types/schema.d.ts'), typescriptTypes, (err) =>{
    if(err != null){
        console.log(err)
    }
});


