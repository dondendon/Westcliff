import { shallowMount } from '@vue/test-utils'

const MessageComponent = {
  template: '<p>{{ msg }}</p>',
  props: ['msg']
}

describe('MessageComponent', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(MessageComponent, { 
      props: { msg } 
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
