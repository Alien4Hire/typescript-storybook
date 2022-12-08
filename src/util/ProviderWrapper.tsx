import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';

const ProviderWrapper: React.FC = ({ children }) => <Router>{children}</Router>;

export default ProviderWrapper;
