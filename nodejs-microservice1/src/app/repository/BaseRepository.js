import knex from '../../database';
import AppError from '../exception/AppError';

export default class BaseRepository {
    schema = "ms";
    table = null;

    db() {
        return knex(this.table).withSchema(this.schema).where(this.table+'.flg_ativo', true);
    }

    async findById(id) {
        const result = await this.db().where('id', id).first();

        if (!result) throw new AppError("Registro não encontrado!");

        return result;
    }

    async delete(id) {
        let obj = await this.findById(id);
        obj.flg_ativo = false;
        await this.db().where('id', id).update(obj);
    }

}