import React, { FC, JSX, useId } from 'react';

interface Param {
  id: number;
  name: string;
  type: 'string';
}

interface Color {
  id: number;
  name: string;
  value: string;
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

interface State {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  }
];

const model: Model = {
  paramValues: [
    {
      'paramId': 1,
      'value': 'повседневное'
    },
    {
      'paramId': 2,
      'value': 'макси'
    }
  ],
  colors: [],
};

interface IParamLineProps {
  param: Param;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParamLine: FC<IParamLineProps> = ({ param, onChange, value }): JSX.Element => {
  const inputId = useId();
  return (<div>
    <label htmlFor={inputId}>{param.name}</label>
    <input id={inputId}
           type="text"
           value={value}
           onChange={onChange}/>
  </div>);
};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      params: this.props.params,
      model: this.props.model,
    };

    this.getModel = this.getModel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  public getModel(): Model {
    return {
      paramValues: this.state.model.paramValues,
      colors: this.state.model.colors,
    };
  }

  private handleInputChange(e: React.ChangeEvent<HTMLInputElement>, param: Param) {
    if (this.state.model.paramValues.find(paramValue => this.state.params.some(param => param.id === paramValue.paramId))) {
      this.setState({
        ...this.state,
        model: {
          ...this.state.model,
          paramValues: this.state.model.paramValues.map(paramValue => paramValue.paramId === param.id ? {
            ...paramValue,
            value: e.target.value,
          } : paramValue)
        }
      });
      return;
    }
    this.setState({
      ...this.state,
      model: {
        ...this.state.model,
        paramValues: [...this.state.model.paramValues, {
          paramId: param.id,
          value: e.target.value,
        }]
      }
    });
  }

  public render() {
    return (<div>
      {this.state.params.map(param => (<>
          {param.type === 'string' && <ParamLine param={param}
                                                 value={this.getModel()
                                                   .paramValues
                                                   .find(value => value.paramId === param.id)?.value}
                                                 onChange={e => this.handleInputChange(e, param)}/>}
        </>
      ))}
    </div>);
  }
}

function App() {
  return (
    <ParamEditor params={params}
                 model={model}/>
  );
}

export default App;
