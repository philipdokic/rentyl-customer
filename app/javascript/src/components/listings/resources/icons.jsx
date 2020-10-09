// Dependencies
// -----------------------------------------------
import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faBolt,
  faCertificate,
  faChartBar,
  faExclamationCircle,
  faTrash,
  faArrowLeft,
  faCheckCircle,
  faTimesCircle,
  faUniversity,
  faEllipsisV,
  faInfoCircle,
  faChevronDown,
  faChevronUp,
  faChevronRight,
  faTimes,
  faThLarge,
  faThList,
  faList,
  faStream,
  faFilter,
  faMap,
  faProjectDiagram,
  faSearch,
  faPlus,
  faCode,
  faStar,
} from '@fortawesome/fontawesome-free-solid';

import {
  faEnvelope,
  faCalendar,
  faEye,
  faTimesCircle as farTimesCircle,
  faStar as farStar
} from '@fortawesome/fontawesome-free-regular';
import { faStripe } from '@fortawesome/free-brands-svg-icons';

const Bolt = props => <FontAwesomeIcon icon={faBolt} {...props} />;

const Envelope = props => <FontAwesomeIcon icon={faEnvelope} {...props} />;

const Certificate = props => (
  <FontAwesomeIcon icon={faCertificate} {...props} />
);

const Calendar = props => <FontAwesomeIcon icon={faCalendar} {...props} />;
const ChartBar = props => <FontAwesomeIcon icon={faChartBar} {...props} />;
const Eye = props => <FontAwesomeIcon icon={faEye} {...props} />;

const ExclamationCircle = props => (
  <FontAwesomeIcon icon={faExclamationCircle} {...props} />
);

const ArrowLeft = props => <FontAwesomeIcon icon={faArrowLeft} {...props} />;

const Delete = props => <FontAwesomeIcon icon={faTrash} {...props} />;

const Search = props => <FontAwesomeIcon icon={faSearch} {...props} />;

const Plus = props => <FontAwesomeIcon icon={faPlus} {...props} />;

const Stripe = props => <FontAwesomeIcon icon={faStripe} {...props} />;

const ThLarge = props => <FontAwesomeIcon icon={faThLarge} {...props} />;
const ThList = props => <FontAwesomeIcon icon={faThList} {...props} />;
const List = props => <FontAwesomeIcon icon={faList} {...props} />;
const Stream = props => <FontAwesomeIcon icon={faStream} {...props} />;
const Filter = props => <FontAwesomeIcon icon={faFilter} {...props} />;
const Map = props => <FontAwesomeIcon icon={faMap} {...props} />;
const ProjectDiagram = props => <FontAwesomeIcon icon={faProjectDiagram} {...props} />;

const CheckCircle = props => (
  <FontAwesomeIcon icon={faCheckCircle} {...props} />
);

const TimesCircle = props => (
  <FontAwesomeIcon icon={faTimesCircle} {...props} />
);

const RegularTimesCircle = props => (
  <FontAwesomeIcon icon={farTimesCircle} {...props} />
);

const Bank = props => <FontAwesomeIcon icon={faUniversity} {...props} />;

const KebabMenuIcon = props => (
  <FontAwesomeIcon icon={faEllipsisV} {...props} />
);

const InfoCircle = props => <FontAwesomeIcon icon={faInfoCircle} {...props} />;

const ChevronDown = props => (
  <FontAwesomeIcon icon={faChevronDown} {...props} />
);

const ChevronUp = props => <FontAwesomeIcon icon={faChevronUp} {...props} />;

const ChevronRight = props => (
  <FontAwesomeIcon icon={faChevronRight} {...props} />
);

const Times = props => <FontAwesomeIcon icon={faTimes} {...props} />;

const CodeIcon = props => <FontAwesomeIcon icon={faCode} {...props} />;

const Star = props => <FontAwesomeIcon icon={faStar} {...props} />;

const EmptyStar = props => <FontAwesomeIcon icon={farStar} {...props} />;

export {
  Bolt,
  Envelope,
  Certificate,
  Calendar,
  ChartBar,
  ExclamationCircle,
  Eye,
  ArrowLeft,
  Delete,
  Search,
  Plus,
  Stripe,
  CheckCircle,
  TimesCircle,
  RegularTimesCircle,
  Bank,
  KebabMenuIcon,
  InfoCircle,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Times,
  CodeIcon,
  ThLarge,
  ThList,
  List,
  Stream,
  Filter,
  Map,
  ProjectDiagram,
  Star,
  EmptyStar
};
