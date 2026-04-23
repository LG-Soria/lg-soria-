import { ElementType } from 'react';

/**
 * Domain Entities
 */

export interface SkillCategory {
    id: number;
    title: string;
    description: string;
    icon: ElementType;
    tech: string[];
    highlights: string[];
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image?: string;
    images?: string[];
    stack: string[];
    link: string;
}
