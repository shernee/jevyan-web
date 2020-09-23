/* eslint-disable no-console */
import React from 'react'
import RadioButtonGroup from '../radio-choices/index'
import {
  groupShape, choiceShape, IlocalChoices, IChoiceHash,
} from '../../../data/type'

interface ItemChoicesProps {
    choiceGroups: Array<groupShape>;
    choices: Array<choiceShape>;
}
const ItemChoices = (props: ItemChoicesProps) => {
  const {
    choiceGroups, choices,
  } = props
  let initSelectedChoices: IlocalChoices = []
  initSelectedChoices = choiceGroups.map((group) => {
    const newInit = { groupId: group.id, choiceId: 0, choicePrice: 0 }
    return newInit
  })
  const initChoiceHash: IChoiceHash = {}
  initSelectedChoices.forEach((group) => {
    initChoiceHash[group.groupId] = initSelectedChoices.indexOf(group)
  })

  console.log('Here')
  console.log(initSelectedChoices)
  console.log(initChoiceHash)

  return (
    <div className="choice-group-section">
      <ul className="choice-group-item">
        {choiceGroups.map((group) => (
          <li key={group.id}>
            {group.choice_type === 1
              ? <RadioButtonGroup choiceGroup={group} choices={choices} />
              : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ItemChoices
