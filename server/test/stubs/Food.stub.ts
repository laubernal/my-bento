import {Food} from 'Menu/Food/Domain/Entity/Food';
import {Amount} from 'Shared/Domain/Vo/Amount.vo';
import {Category} from 'Shared/Domain/Vo/Category.vo';
import {Id} from 'Shared/Domain/Vo/Id.vo';
import {Name} from 'Shared/Domain/Vo/Name.vo';
import {Quantity} from 'Shared/Domain/Vo/Quantity.vo';
import {StringVo} from 'Shared/Domain/Vo/String.vo';
import {Unit} from 'Shared/Domain/Vo/Unit.vo';

export const foodStub = (id: string): Food => {
    return new Food(
        new Id(id),
        new Name('Pan'),
        new Category('Carbohidratos'),
    );
};
