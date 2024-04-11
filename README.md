# Редактор параметров
Есть следующие структуры данных, описывающих товар – интерфейс Model и набор
параметров этого товара. Необходимо реализовать на React компоненты, которые
позволяют редактировать структуру Model – проставлять значения параметров при
этом параметры должны выводиться все и сразу должны быть доступны для
редактирования, а переданные значения в структуре проставлены в форме
редактирования, которые передаются в params: Param[], а так же позволяют получить
полную структуру в методе getModel() – содержащую все проставленные значения
параметров. Решение должно быть легко расширяемым (например, позволять легко
добавлять новые типы параметров – не только текстовые, но например числовые или
со списком значений) Ваша реализация должна работать только с текстовыми
параметрами Input – тип string.

## Решение необходимо оформить в виде одного файла со всеми компонентами и типами которые используются.

```typescript
interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

class ParamEditor extends React.Component<Props, State> {
  public getModel(): Model {
  }
}
```
## Пример структуры:

```typescript
params: [
  {
    'id': 1,
    'name': 'Назначение'
  },
  {
    'id': 2,
    'name': 'Длина'
  }
];

model:
{
  paramValues:[
    {
      'paramId': 1,
      'value': 'повседневное'
    },
    {
      'paramId': 2,
      'value': 'макси'
    }
  ];
}
```


