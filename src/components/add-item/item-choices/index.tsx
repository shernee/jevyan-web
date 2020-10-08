/* eslint-disable no-console */
import React from 'react'
import {
  RadioGroup,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Checkbox,
} from '@material-ui/core/'
import {
  bannerShape, groupShape, choiceShape, IChoiceHash, IlocalChoices,
} from '../../../data/type'
import {
  bannerFromStorage,
} from '../../../helper/helper'
import './index.css'

interface ItemChoicesProps {
  choiceGroups: Array<groupShape>;
  choices: Array<choiceShape>;
  choiceHash: IChoiceHash;
  handleChoicePrice: Function;
  selectedChoices: IlocalChoices;
}

const checkValidity = (obj: any, selCh: IlocalChoices): any => {
  const clicked = obj
  const selGr = selCh.filter((group) => group.groupId === obj.groupId)[0]
  let numSelected = selGr.choiceId.length
  numSelected = clicked.checked ? numSelected - 1 : numSelected + 1
  if (numSelected >= selGr.min) {
    clicked.valid = true
  }
  return clicked
}

const getChooseRule = (groupId: number, groups: Array<groupShape>): string => {
  const gindex = groups.findIndex((group) => group.id === groupId)
  const choiceType: number = gindex !== -1 ? groups[gindex].choice_type : 0
  const max: number = groups[gindex].max_allowed
  const min: number = groups[gindex].min_allowed
  let rule:string = ''
  if (choiceType === 1) {
    rule = 'Required'
  } else if (choiceType === 2) {
    if (min > 0) {
      rule = `Choose atleast ${min}`
    } else if (min === 0) {
      rule = `Choose upto ${max}`
    }
  }
  return rule
}

const ItemChoices = (props: ItemChoicesProps) => {
  const {
    choiceGroups, choices, choiceHash, handleChoicePrice, selectedChoices,
  } = props

  const localBanner: bannerShape = bannerFromStorage()

  console.log(selectedChoices)

  const checkChecked = (incomingGroup: number, incomingChoice: number): boolean => {
    const choice: Array<number> = selectedChoices[choiceHash[incomingGroup]].choiceId
    return choice.includes(incomingChoice)
  }

  const gteMax = (groupId: number) => {
    const choice: Array<number> = selectedChoices[choiceHash[groupId]].choiceId
    const disabled: boolean = choice.length >= selectedChoices[choiceHash[groupId]].max
    return disabled
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt((event.target as HTMLInputElement).value, 10)
    const newGroupId = parseInt((event.target as HTMLInputElement).name, 10)
    const cindex = choices.findIndex((choice) => choice.id === newValue)
    const newChoiceName: string = cindex !== -1 ? choices[cindex].name : ''
    const newPrice = parseInt(choices.find((c) => c.id === newValue)?.price || '', 10)
    const existingIndex: number = choiceHash[newGroupId]
    let newObj = {
      groupId: newGroupId,
      choiceId: newValue,
      choiceName: newChoiceName,
      choicePrice: newPrice,
      valid: false,
      checked: false,
    }
    newObj = checkValidity(newObj, selectedChoices)
    console.log(newObj)
    handleChoicePrice(newObj, existingIndex)
  }

  const handleCheckChange = (groupId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.name, 10)
    const newGroupId = groupId
    const cindex = choices.findIndex((choice) => choice.id === newValue)
    const newChoiceName: string = cindex !== -1 ? choices[cindex].name : ''
    const newPrice = parseInt(choices.find((c) => c.id === newValue)?.price || '', 10)
    const existingIndex: number = choiceHash[newGroupId]
    let newObj = {
      groupId: newGroupId,
      choiceId: newValue,
      choiceName: newChoiceName,
      choicePrice: newPrice,
      valid: false,
      checked: checkChecked(newGroupId, newValue),
    }
    newObj = checkValidity(newObj, selectedChoices)
    handleChoicePrice(newObj, existingIndex)
  }

  return (
    <div className="choice-group-section">
      <ul className="choice-group-item">
        {choiceGroups.map((group) => (
          <li key={group.id}>
            {group.choice_type === 1
              ? (
                <FormControl component="fieldset">
                  <div className="choice-group-heading">
                    <FormLabel component="label">{group.name}</FormLabel>
                    <div className="choose-rule">{getChooseRule(group.id, choiceGroups)}</div>
                  </div>
                  <RadioGroup aria-label={group.name} name={group.id.toString()} onChange={handleRadioChange}>
                    {choices.filter((c) => c.group === group.id).map((ch) => (
                      <div key={ch.id} className="choice-line">
                        <FormControlLabel
                          key={ch.id}
                          name={group.id.toString()}
                          value={ch.id.toString()}
                          control={<Radio />}
                          label={ch.name}
                        />
                        <div className="choice-price">
                          {`+ ${localBanner.currency} ${ch.price}`}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )
              : (
                <FormControl component="fieldset">
                  <div className="choice-group-heading">
                    <FormLabel component="label">{group.name}</FormLabel>
                    <div className="choose-rule">{getChooseRule(group.id, choiceGroups)}</div>
                  </div>
                  <FormGroup>
                    {choices.filter((c) => c.group === group.id).map((ch) => (
                      <div key={ch.id} className="choice-line">
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={checkChecked(group.id, ch.id)}
                              onChange={(event) => handleCheckChange(group.id, event)}
                              name={ch.id.toString()}
                              disabled={!(checkChecked(group.id, ch.id)) && gteMax(group.id)}
                            />
                          )}
                          label={ch.name}
                        />
                        <div className="choice-price">
                          {`+ ${localBanner.currency} ${ch.price}`}
                        </div>
                      </div>
                    ))}
                  </FormGroup>
                </FormControl>
              )}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ItemChoices
/*
const [CheckChoice, setCheckChoice] = React.useState([])
(
<FormControl component="fieldset" className={classes.formControl}>
  <FormLabel className="choice-group-heading" component="legend" required>{group.name}</FormLabel>
  <FormGroup>
  {choices.filter((c) => c.group === group.id).map((ch) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={CheckChoice.length && checkChoice.includes(ch.id)}
          onChange={handleCheckChange}
          name={ch.name}
        />
      }
      label={ch.name}
    />
  ))}
  </FormGroup>
</FormControl>
)
*/
