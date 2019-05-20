import React from 'react';
import { Link } from 'react-router-dom';
import Radio from './Radio';
import Button from '../Button';

function RadioDemo() {
  const [controlledChecked, setControlledChecked] = React.useState(false);
  const [controlledDisabled, setControlledDisabled] = React.useState(false);
  return (
    <>
      <Link to="/" className="demo-goback">
        返回
      </Link>
      <div className="demo-box">
        <Radio name="demo-checkbox">Radio</Radio>
        <Radio defaultChecked={true}>Radio</Radio>
        <Radio defaultChecked={true} disabled={true}>
          Radio
        </Radio>
        <Radio />
      </div>
      <div className="demo-box">
        <Radio
          checked={controlledChecked}
          disabled={controlledDisabled}
          onChange={() => setControlledChecked(true)}>
          Controlled Radio
        </Radio>
        <Button
          type="primary"
          onClick={() => setControlledChecked(!controlledChecked)}>
          Toggle Checked
        </Button>
        <Button
          type="primary"
          onClick={() => setControlledDisabled(!controlledDisabled)}>
          Toggle Disabled
        </Button>
      </div>
      <div className="demo-box">
        <Radio name="demo-radio-native-group" defaultChecked={true}>
          Radio Group
        </Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
        <Radio name="demo-radio-native-group">Radio Group</Radio>
      </div>
      <div className="demo-box">
        <Radio.Button>Radio Button</Radio.Button>
        <Radio.Button defaultChecked={true}>Radio Button</Radio.Button>
        <Radio.Button defaultChecked={true} disabled={true}>
          Radio Button
        </Radio.Button>
        <Radio.Button size="small">Radio Button</Radio.Button>
        <Radio.Button size="large">Radio Button</Radio.Button>
      </div>
    </>
  );
}

export default RadioDemo;
