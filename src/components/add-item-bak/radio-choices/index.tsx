/* eslint-disable no-console */
import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import {
  groupShape, choiceShape, IlocalChoices,
} from '../../../data/type'

interface RadioButtonProps {
  choiceGroup: groupShape;
  choices: Array<choiceShape>;
}
interface IChoiceHash {
  [groupId: string] : number;
}

const RadioButtonGroup = (props: RadioButtonProps) => {
  const {
    choiceGroup, choices,
  } = props
  const [ChoiceValue, setChoiceValue] = React.useState<number>()
  let stringChoices: string | null = localStorage.getItem('selectedChoices')
  let localChoices: IlocalChoices = []
  if (stringChoices) localChoices = JSON.parse(stringChoices)
  function isNotEmpty(obj: IChoiceHash) {
    return !(Object.keys(obj).length === 0)
  }
  const choiceHash: IChoiceHash = {}
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt((event.target as HTMLInputElement).value, 10)
    setChoiceValue(newValue)
    const newPrice = parseInt(choices.find((c) => c.id === newValue)?.price || '', 10)
    const newObj = { groupId: choiceGroup.id, choiceId: newValue, choicePrice: newPrice }
    if (isNotEmpty(choiceHash)) {
      console.log('not empty')
      if (choiceGroup.id in choiceHash) {
        const existingIndex: number = choiceHash[choiceGroup.id]
        localChoices[existingIndex] = newObj
      } else {
        const newIndex = localChoices.length - 1
        localChoices[newIndex] = newObj
        choiceHash[choiceGroup.id] = newIndex
      }
    } else {
      console.log('empty')
      localChoices.push(newObj)
      choiceHash[choiceGroup.id] = 0
    }
    console.log(localChoices)
    stringChoices = JSON.stringify(localChoices)
    localStorage.setItem('selectedChoices', stringChoices)
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{choiceGroup.name}</FormLabel>
      <RadioGroup aria-label={choiceGroup.name} name={choiceGroup.id.toString()} value={ChoiceValue} onChange={handleChange}>
        {choices.filter((c) => c.group === choiceGroup.id).map((ch) => (
          <FormControlLabel key={ch.id} value={ch.id.toString()} control={<Radio />} label={ch.name} />
        ))}
      </RadioGroup>
    </FormControl>
  )
}
export default RadioButtonGroup

/*
const onRadioChange = (event: any) => {
    const choiceId = parseInt(event.target.id, 10)
    const groupId = parseInt(event.target.name, 10)
    let currChoices = SelectedChoices
    console.log(SelectedChoices, 'before')
    const chIndex = currChoices.findIndex((ch) => ch.group === groupId)
    console.log(chIndex)
    if (chIndex !== -1) {
      console.log(currChoices)
      currChoices[chIndex].choice = choiceId
    } else {
      console.log(currChoices = [...currChoices, { group: groupId, choice: choiceId }])
    }
    setSelectedChoices(currChoices)
    console.log(SelectedChoices, 'after')
  }
  */
