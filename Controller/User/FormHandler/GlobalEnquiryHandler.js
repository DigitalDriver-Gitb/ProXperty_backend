import GlobalEnquiryModel from "../../../models/Users/FormHandlermodel/GlobalEnquiryModal.js";

// Create a new global enquiry
export const createGlobalEnquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message,
      pageInfo,
      projectDetails,
      source,
      timestamp
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and phone are required fields"
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format"
      });
    }

    // Create new enquiry
    const newEnquiry = new GlobalEnquiryModel({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      message: message || '',
      pageInfo: pageInfo || {
        url: '',
        pageType: 'unknown',
        entityName: '',
        entityDetails: {}
      },
      projectDetails: projectDetails || {},
      source: source || 'mobile_footer_enquiry',
      timestamp: timestamp || new Date().toISOString(),
      status: 'pending'
    });

    // Save enquiry to database
    const savedEnquiry = await newEnquiry.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: savedEnquiry
    });

  } catch (error) {
    console.error("Error creating global enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get all global enquiries with optional filtering
export const getGlobalEnquiries = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      pageType,
      source,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter query
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (pageType) {
      filter['pageInfo.pageType'] = pageType;
    }
    
    if (source) {
      filter.source = source;
    }

    // Build sort query
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute queries
    const [enquiries, totalCount] = await Promise.all([
      GlobalEnquiryModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      GlobalEnquiryModel.countDocuments(filter)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / parseInt(limit));
    const hasNextPage = parseInt(page) < totalPages;
    const hasPreviousPage = parseInt(page) > 1;

    // Return success response
    res.status(200).json({
      success: true,
      message: "Enquiries retrieved successfully",
      data: {
        enquiries,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalCount,
          limit: parseInt(limit),
          hasNextPage,
          hasPreviousPage
        }
      }
    });

  } catch (error) {
    console.error("Error fetching global enquiries:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get a single global enquiry by ID
export const getGlobalEnquiryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID"
      });
    }

    // Find enquiry
    const enquiry = await GlobalEnquiryModel.findById(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Enquiry retrieved successfully",
      data: enquiry
    });

  } catch (error) {
    console.error("Error fetching global enquiry by ID:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Update global enquiry status
export const updateGlobalEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID"
      });
    }

    // Validate status
    const validStatuses = ['pending', 'contacted', 'converted', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: " + validStatuses.join(', ')
      });
    }

    // Find and update enquiry
    const updatedEnquiry = await GlobalEnquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Enquiry status updated successfully",
      data: updatedEnquiry
    });

  } catch (error) {
    console.error("Error updating global enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Delete global enquiry
export const deleteGlobalEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry ID"
      });
    }

    // Find and delete enquiry
    const deletedEnquiry = await GlobalEnquiryModel.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found"
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: deletedEnquiry
    });

  } catch (error) {
    console.error("Error deleting global enquiry:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Get enquiry statistics
export const getGlobalEnquiryStats = async (req, res) => {
  try {
    const stats = await GlobalEnquiryModel.aggregate([
      {
        $group: {
          _id: null,
          totalEnquiries: { $sum: 1 },
          pendingEnquiries: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
          },
          contactedEnquiries: {
            $sum: { $cond: [{ $eq: ["$status", "contacted"] }, 1, 0] }
          },
          convertedEnquiries: {
            $sum: { $cond: [{ $eq: ["$status", "converted"] }, 1, 0] }
          },
          closedEnquiries: {
            $sum: { $cond: [{ $eq: ["$status", "closed"] }, 1, 0] }
          }
        }
      }
    ]);

    const pageTypeStats = await GlobalEnquiryModel.aggregate([
      {
        $group: {
          _id: "$pageInfo.pageType",
          count: { $sum: 1 }
        }
      }
    ]);

    const sourceStats = await GlobalEnquiryModel.aggregate([
      {
        $group: {
          _id: "$source",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Statistics retrieved successfully",
      data: {
        overview: stats[0] || {
          totalEnquiries: 0,
          pendingEnquiries: 0,
          contactedEnquiries: 0,
          convertedEnquiries: 0,
          closedEnquiries: 0
        },
        pageTypeStats,
        sourceStats
      }
    });

  } catch (error) {
    console.error("Error fetching global enquiry stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};