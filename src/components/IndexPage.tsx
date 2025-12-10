import React from 'react';
import { Container } from 'react-bootstrap';
import {
    certifications,
    experiences,
    interests,
    profile,
    schools,
    skills,
    workflows,
} from '../fixtures';
import AboutSection from './AboutSection';
import AwardsSection from './AwardsSection';
import { Divider } from './common';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import InterestsSection from './InterestsSection';
import SkillsSection from './SkillsSection';
import VisitorCounter from './VisitorCounter';

const IndexPage: React.FC = () => (
    <Container className="p-0" fluid>
        <AboutSection profile={profile} />
        <Divider />

        <ExperienceSection experiences={experiences} />
        <Divider />

        <EducationSection schools={schools} />
        <Divider />

        <SkillsSection skills={skills} workflows={workflows} />
        <Divider />

        <InterestsSection interests={interests} />
        <Divider />

        <AwardsSection certifications={certifications} />
        <Divider />
        
        <div className="text-center py-3">
            <VisitorCounter apiUrl="https://lemon-smoke-0541d8f0f.3.azurestaticapps.net/api/visitor" />
        </div>
    </Container>
);

export default IndexPage;
