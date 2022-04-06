import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import UserSearch from "../views/UserSearch.vue";

describe('User Search tests', () => {
    it('should display a list of 20 users', () => {
        const wrapper = mount(UserSearch);
        expect(wrapper.findAll('.card').length).toBe(20)
    })

    it('should display all users that their email ends with @hotmail', async () => {
        const wrapper = mount(UserSearch);
        await wrapper.find('input').setValue('@hotmail')
        wrapper.findAll('.card').forEach(card => {
            console.log(card.findAll('p')[1]);
            expect(card.findAll('p')[1].text()).toMatch(/hotmail.com/)
        })
    })

    it('should display all users that their email ends with @yahoo', async () => {
        const wrapper = mount(UserSearch);
        await wrapper.find('input').setValue('@yahoo')
        wrapper.findAll('.card').forEach(card => {
            expect(card.findAll('p')[1].text()).toMatch(/yahoo.com/)
        })
    })

    it('should check if all displayed emails are valid', () => {
        const wrapper = mount(UserSearch)
        wrapper.findAll('.card').forEach(card => {
            expect(card.findAll('p')[1].text().substring(7)).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        })
    })
})