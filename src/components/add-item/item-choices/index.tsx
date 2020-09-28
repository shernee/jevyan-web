/* eslint-disable no-console */
import React from 'react'
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
} from '@material-ui/core/'
import {
  bannerShape, groupShape, choiceShape, IlocalChoice, IChoiceHash,
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
}

const ItemChoices = (props: ItemChoicesProps) => {
  const {
    choiceGroups, choices, choiceHash, handleChoicePrice,
  } = props

  const localBanner: bannerShape = bannerFromStorage()

  const [ChoiceValue, setChoiceValue] = React.useState<number>()

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt((event.target as HTMLInputElement).value, 10)
    const newGroupId = parseInt((event.target as HTMLInputElement).name, 10)
    const gindex = choiceGroups.findIndex((group) => group.id === newGroupId)
    const newGroupName: string = gindex !== -1 ? choiceGroups[gindex].name : ''
    const cindex = choices.findIndex((choice) => choice.id === newValue)
    const newChoiceName: string = cindex !== -1 ? choices[cindex].name : ''
    const newPrice = parseInt(choices.find((c) => c.id === newValue)?.price || '', 10)
    const existingIndex: number = choiceHash[newGroupId]
    const newObj: IlocalChoice = {
      groupId: newGroupId,
      groupName: newGroupName,
      choiceId: newValue,
      choiceName: newChoiceName,
      choicePrice: newPrice,
    }
    handleChoicePrice(newObj, existingIndex)
    setChoiceValue(newValue)
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
                  <RadioGroup aria-label={group.name} name={group.id.toString()} value={ChoiceValue} onChange={handleRadioChange}>
                    {choices.filter((c) => c.group === group.id).map((ch) => (
                      <div key={ch.id} className="radio-line">
                        <FormControlLabel
                          key={ch.id}
                          name={group.id.toString()}
                          value={ch.id.toString()}
                          control={<Radio />}
                          label={ch.name}
                        />
                        <div className="radio-price">
                          {`+ ${localBanner.currency} ${ch.price}`}
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )
              : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ItemChoices
/*
{(parseInt(ch.price, 10) > 0)
                          && (
                          <div className="radio-price">{ch.price}</div>
                          )}
*/
