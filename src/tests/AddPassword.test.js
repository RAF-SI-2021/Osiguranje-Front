import { describe, it, expect } from "vitest"; 
import { mount } from "@vue/test-utils";
import AddPassword from "../views/AddPassword.vue";

describe('Add password test', ()=>{

    it('should render the add password page', ()=>{
        const wrapper = mount(AddPassword);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.find('#exampleInputPassword1').exists()).toBeTruthy();
        expect(wrapper.find('#exampleInputPassword2').exists()).toBeTruthy();
        expect(wrapper.find('.btn-primary').text()).toBe('Submit');
        expect(wrapper.find('.btn-danger').text()).toBe('Reset');

    });

    it('should show validation error on empty fields',  async() => {
        const wrapper = mount(AddPassword);
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('.error-msg').length).toBe(2);
    });

    it('should not show validation error on valid input',  async() => {
        const wrapper = mount(AddPassword);
        await wrapper.find('#exampleInputPassword1').setValue('simplepassword');
        await wrapper.find('#exampleInputPassword2').setValue('simplepassword');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('.error-msg').length).toBe(0);
    });

    it('should show password length error',  async() => {
        const wrapper = mount(AddPassword);
        await wrapper.find('#exampleInputPassword1').setValue('a');
        await wrapper.find('#exampleInputPassword2').setValue('a');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('.error-msg').length).toBe(2);
    });

    it('should show password not matching error',  async() => {
        const wrapper = mount(AddPassword);
        await wrapper.find('#exampleInputPassword1').setValue('simplepassword');
        await wrapper.find('#exampleInputPassword2').setValue('simpletest');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('.error-msg').length).toBe(1);
        expect(wrapper.find('.error-msg').text()).toBe('The value must be equal to the other value');
    });

});