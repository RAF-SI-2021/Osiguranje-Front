import { describe, it, expect } from "vitest"; 
import { mount } from "@vue/test-utils";
import NewUserView from "../views/NewUserView.vue";

describe('New user tests', ()=>{

    it('should render the new user page', ()=>{
        const wrapper = mount(NewUserView);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        let checkbox = wrapper.find('#form2Example3cg');
        expect(checkbox.exists()).toBeTruthy();
        expect(wrapper.find('button').text()).toBe('Register');

    });

    it('should show validation error on empty fields',  async() => {
        const wrapper = mount(NewUserView);
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('span').length).toBe(6);
    });

    it('should show no validation errors on valid field', async () => {
        const wrapper = mount(NewUserView);
        await wrapper.find('#email').setValue('testmail@gmail.com');
        await wrapper.find('#name').setValue('Mika');
        await wrapper.find('#surname').setValue('Mikic');
        await wrapper.find('#jmbg').setValue('0904202211231');
        await wrapper.find('#position').setValue('Lead Java Developer');
        await wrapper.find('#phoneNumber').setValue('0038164555333');
        expect(wrapper.findAll('span').length).toBe(0);
    });

    it('should show value must be numeric error', async () => {
        const wrapper = mount(NewUserView);
        await wrapper.find('#email').setValue('testmail@gmail.com');
        await wrapper.find('#name').setValue('Mika');
        await wrapper.find('#surname').setValue('Mikic');
        await wrapper.find('#jmbg').setValue('0904202211231');
        await wrapper.find('#position').setValue('Lead Java Developer');
        await wrapper.find('#phoneNumber').setValue('test');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('span').length).toBe(1);
        expect(wrapper.find('span').text()).toBe('Value must be numeric');
    });

    it('should show jmbg length error', async () => {
        const wrapper = mount(NewUserView);
        await wrapper.find('#email').setValue('testmail@gmail.com');
        await wrapper.find('#name').setValue('Mika');
        await wrapper.find('#surname').setValue('Mikic');
        await wrapper.find('#jmbg').setValue('1');
        await wrapper.find('#position').setValue('Lead Java Developer');
        await wrapper.find('#phoneNumber').setValue('0038164555333');
        await wrapper.find('.btn-primary').trigger('submit');
        expect(wrapper.findAll('span').length).toBe(1);
        expect(wrapper.find('span').text()).toBe('This field should be at least 13 long');
        await wrapper.find('#jmbg').setValue('111111111111111');
        expect(wrapper.find('span').text()).toBe('The maximum length allowed is 13');

    });

});