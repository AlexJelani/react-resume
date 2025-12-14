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
    </Container>
);

export default IndexPage;
