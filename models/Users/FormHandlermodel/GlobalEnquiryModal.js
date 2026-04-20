import mongoose from "mongoose";

const GlobalEnquirySchema = new mongoose.Schema({
  // Basic user information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    default: ''
  },

  // Page tracking information
  pageInfo: {
    url: {
      type: String,
      required: true
    },
    pageType: {
      type: String,
      enum: ['home', 'city', 'project', 'builder', 'cityType', 'service', 'unknown'],
      default: 'unknown'
    },
    entityName: {
      type: String,
      default: ''
    },
    entityDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  },

  // Enhanced project tracking
  projectDetails: {
    projectUrl: String,
    source: {
      type: String,
      default: 'mobile_footer_enquiry'
    },
    timestamp: String,
    trackingContext: {
      page: String,
      source: String,
      projectIdentifier: String
    }
  },

  // Metadata
  source: {
    type: String,
    default: 'mobile_footer_enquiry'
  },
  timestamp: {
    type: String,
    default: new Date().toISOString()
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'converted', 'closed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const GlobalEnquiryModel = mongoose.model("GlobalEnquiry", GlobalEnquirySchema);
export default GlobalEnquiryModel;
