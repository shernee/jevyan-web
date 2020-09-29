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
  bannerShape, groupShape, choiceShape, IlocalChoice, IChoiceHash, IlocalChoices,
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
  const selGr = selCh.filter((group) => group.groupId === obj.groupId)
  let numSelected = selGr[0].choiceId.length
  numSelected = clicked.checked ? numSelected - 1 : numSelected + 1
  if (numSelected >= selGr[0].min) {
    clicked.valid = true
  }
  return clicked
}

const ItemChoices = (props: ItemChoicesProps) => {
  const {
    choiceGroups, choices, choiceHash, handleChoicePrice, selectedChoices,
  } = props

  const localBanner: bannerShape = bannerFromStorage()

  const [RadioChoice, setRadioChoice] = React.useState<number>()

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
    const gindex = choiceGroups.findIndex((group) => group.id === newGroupId)
    const choiceType: number = gindex !== -1 ? choiceGroups[gindex].choice_type : 0
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
    handleChoicePrice(newObj, existingIndex)
    setRadioChoice(newValue)
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
    setRadioChoice(newValue)
  }

  return (
    <div className="choice-group-section">
      <ul className="choice-group-item">
        {choiceGroups.map((group) => (
          <li key={group.id}>
            {group.choice_type === 1
              ? (
                <FormControl component="fieldset">
                  <FormLabel className="choice-group-heading" component="label" required>{group.name}</FormLabel>
                  <RadioGroup aria-label={group.name} name={group.id.toString()} value={RadioChoice} onChange={handleRadioChange}>
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
                  <FormLabel className="choice-group-heading" component="legend" required>{group.name}</FormLabel>
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
