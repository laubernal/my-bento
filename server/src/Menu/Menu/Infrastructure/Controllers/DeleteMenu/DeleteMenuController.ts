import {Controller, Delete, Headers, Param, Res} from '@nestjs/common';
import {CommandBus} from '@nestjs/cqrs';
import {Response} from 'express';
import {MyBentoResponse} from 'Shared/Domain/MyBentoResponse';
import {DeleteMenuCommand} from 'Menu/Menu/Application/DeleteMenu/DeleteMenuCommand';
import {DeleteMenuParams} from 'Menu/Menu/Infrastructure/Controllers/DeleteMenu/DeleteMenuParams';

@Controller()
export class DeleteMenuController {
    constructor(private readonly commandBus: CommandBus) {}
    
    @Delete(`/api/menus/:id`)
    public async delete(
        @Param() params: DeleteMenuParams,
        @Headers('traceId') traceId: string,
        @Res() res: Response) {
        try {
            const command = DeleteMenuCommand.fromJson(params.id, traceId);
            
            await this.commandBus.execute(command);
            
            const response = new MyBentoResponse(null, {
                success: true,
                error: null
            });
            
            return res.status(200).json(response);
        } catch (error: any) {
            const errorResponse = new MyBentoResponse(null, {
                success: false,
                error: error.message
            });
            
            return res.status(400).json(errorResponse);
        }
        
    }
}