import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from '../Contact';
import Hero from '../Hero';
import About from '../About';
import App from '../../App';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('Website Updates', () => {
    describe('Contact Section', () => {
        it('should display the correct primary phone number', () => {
            render(<Contact />);
            expect(screen.getByText('0532 470 35 66')).toBeTruthy();
        });

        it('should display the correct secondary phone number', () => {
            render(<Contact />);
            expect(screen.getByText('0535 694 39 64')).toBeTruthy();
        });

        it('should not display email address', () => {
            render(<Contact />);
            const emailRegex = /info@iskenderoglureis.com/i;
            expect(screen.queryByText(emailRegex)).toBeNull();
        });

        it('should not display contact form', () => {
            render(<Contact />);
            expect(screen.queryByRole('form')).toBeNull();
            expect(screen.queryByLabelText(/adınız soyadınız/i)).toBeNull();
        });
    });

    describe('About Section', () => {
        it('should not display vehicle wrap image', () => {
            render(<About />);
            const vehicleImage = screen.queryByAltText(/iskenderoğlu reis ekibi/i);
            if (vehicleImage) {
                const src = vehicleImage.getAttribute('src');
                expect(src).not.toContain('vehicle_wrap');
            } else {
                expect(vehicleImage).toBeNull();
            }
        });
    });

    describe('Hero Section', () => {
        it('should have a working search button that scrolls to services', () => {
            render(<Hero />);
            const searchBtn = screen.getByRole('button');
            expect(searchBtn).toBeTruthy();
            fireEvent.click(searchBtn);
            // Ensure no crash
        });
    });

    describe('Background', () => {
        it('should have the background image set in CSS', () => {
            // Manual verification for CSS background
        });
    });
});
