import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import LoginView from "../views/LoginView.vue"

describe('Login tests', () => {
  it('should render the login view', () => {
    const wrapper = mount(LoginView);
    expect(wrapper.find('h3').exists()).toBeTruthy();
    expect(wrapper.findAll('input').length).toBe(2);
    expect(wrapper.find('button').text()).toBe('Sign in');
  });

  it('should show validation error on empty fields',  async() => {
      const wrapper = mount(LoginView);
      await wrapper.find('.btn-primary').trigger('submit');
      expect(wrapper.findAll('span').length).toBe(2);
  })

    it('should show only one validation error for email input', async () => {
        const wrapper = mount(LoginView);
        await wrapper.find('#email').setValue('testmail@gmail.com');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('span').length).toBe(1);
    })

    it('should show only one validation error for password input', async () => {
        const wrapper = mount(LoginView);
        await wrapper.find('#password').setValue('12345678');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('span').length).toBe(1);
    })

});