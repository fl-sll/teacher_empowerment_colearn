const Metrics = require("../models/Metrics");
const SessionStudents = require("../models/SessionStudent");
const Students = require("../models/Student");
const Sessions = require("../models/Session");
const Classes = require("../models/Class");

exports.createMetrics = async (req, res) => {
  try {
    const metrics = await Metrics.create(req.body);
    res.status(201).json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMetricsById = async (req, res) => {
  const { metricsId } = req.params;
  try {
    const metrics = await Metrics.findByPk(metricsId);
    if (!metrics) {
      return res.status(404).json({ message: "Metrics not found" });
    }
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateMetrics = async (req, res) => {
  const { metricsId } = req.params;
  try {
    const metrics = await Metrics.findByPk(metricsId);
    if (!metrics) {
      return res.status(404).json({ message: "Metrics not found" });
    }
    await metrics.update(req.body);
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteMetrics = async (req, res) => {
  const { metricsId } = req.params;
  try {
    const metrics = await Metrics.findByPk(metricsId);
    if (!metrics) {
      return res.status(404).json({ message: "Metrics not found" });
    }
    await metrics.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.calculateStudent = async (req, res) => {
    const { studentId } = req.params; // Only take studentId from params
    try {
      // Fetch the student to check if they already have a metricsId
      const student = await Students.findOne({
        where: { studentId: studentId },
      });
  
      if (!student) {
        return res.status(404).json({
          message: `Student not found for studentId: ${studentId}`,
        });
      }
  
      // Fetch all session students for the given studentId from the SessionStudents table
      const sessionStudents = await SessionStudents.findAll({
        where: { studentId: studentId },
      });
  
      if (sessionStudents.length === 0) {
        return res.status(404).json({
          message: `No session students found for studentId: ${studentId}`,
        });
      }
  
      // Calculate the averages of pretest, posttest, and metricsId for the student
      const totalMetricsId = sessionStudents.reduce(
        (sum, entry) => sum + entry.metricsId,
        0
      );
      const totalPretest = sessionStudents.reduce(
        (sum, entry) => sum + entry.pretest,
        0
      );
      const totalPosttest = sessionStudents.reduce(
        (sum, entry) => sum + entry.posttest,
        0
      );
  
      const avgMetricsId = totalMetricsId / sessionStudents.length; // Average of metricsId
      const avgPretest = totalPretest / sessionStudents.length;
      const avgPosttest = totalPosttest / sessionStudents.length;
  
      // Fetch all metrics entries from the Metrics table using the metricsIds from sessionStudents
      const metricsEntries = await Metrics.findAll({
        where: { metricsId: sessionStudents.map((entry) => entry.metricsId) },
      });
  
      if (metricsEntries.length === 0) {
        return res.status(404).json({
          message: `No metrics found for the studentId: ${studentId}`,
        });
      }
  
      // Calculate the average values from the fetched metrics entries
      const totalStickiness = metricsEntries.reduce(
        (sum, entry) => sum + entry.stickiness,
        0
      );
      const totalAvgTimeSpent = metricsEntries.reduce(
        (sum, entry) => sum + entry.avgTimeSpent,
        0
      );
      const totalAttendanceOver30Mins = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceOver30Mins,
        0
      );
      const totalAttendance = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendance,
        0
      );
      const totalCorrectness = metricsEntries.reduce(
        (sum, entry) => sum + entry.correctness,
        0
      );
      const totalAttendanceRate = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceRate,
        0
      );
  
      const avgStickiness = totalStickiness / metricsEntries.length;
      const avgAvgTimeSpent = totalAvgTimeSpent / metricsEntries.length;
      const avgAttendanceOver30Mins = totalAttendanceOver30Mins / metricsEntries.length;
      const avgAttendance = totalAttendance / metricsEntries.length;
      const avgCorrectness = totalCorrectness / metricsEntries.length;
      const avgAttendanceRate = totalAttendanceRate / metricsEntries.length;
  
      // Check if the student already has a metricsId
      if (student.metricsId) {
        // If the student already has a metricsId, update the existing metrics entry
        const existingMetrics = await Metrics.findOne({
          where: { metricsId: student.metricsId },
        });
  
        if (existingMetrics) {
          // Update the existing metrics entry with the calculated averages
          await existingMetrics.update({
            avgPretest,
            avgPosttest,
            stickiness: avgStickiness,
            avgTimeSpent: avgAvgTimeSpent,
            attendanceOver30Mins: avgAttendanceOver30Mins,
            attendanceRate: attendanceRate,
            attendance: avgAttendance,
            correctness: avgCorrectness,
            improvement: "no improvement", // Add improvement logic if needed,
            studentId: studentId
          });
  
          return res.status(200).json({
            message: "Metrics entry updated successfully",
            metricsId: student.metricsId,
            studentId: studentId
          });
        } else {
          return res.status(404).json({
            message: `Metrics entry not found for metricsId: ${student.metricsId}`,
          });
        }
      } else {
        // If the student does not have a metricsId, create a new metrics entry
        const newMetricsId = Math.floor(Math.random() * 900) + 100;
  
        // Create an empty metrics entry first with a new metricsId
        const newMetrics = await Metrics.create({
          metricsId: newMetricsId,
          avgPretest: 0, // Initial values for new metrics
          avgPosttest: 0,
          stickiness: 0,
          avgTimeSpent: 0,
          attendanceOver30Mins: 0,
          attendance: 0,
          attendanceRate:0,
          correctness: 0,
          improvement: "no improvement", // Add improvement logic if needed
          studentId: studentId
        });
  
        // Update the metrics entry with the calculated averages
        await newMetrics.update({
          avgPretest,
          avgPosttest,
          stickiness: avgStickiness,
          avgTimeSpent: avgAvgTimeSpent,
          attendanceOver30Mins: avgAttendanceOver30Mins,
          attendance: avgAttendance,
          attendanceRate: avgAttendanceRate,
          correctness: avgCorrectness,
          improvement: "no improvement",
          studentId: studentId
        });
  
        // Update the student with the new metricsId
        await student.update({ metricsId: newMetricsId });
  
        return res.status(201).json({
          message: "Metrics entry created and student updated successfully",
          metricsId: newMetricsId,
        });
      }
    } catch (error) {
      console.error("Error processing request", error);
      return res
        .status(500)
        .json({ message: `Error processing request for studentId: ${studentId}` });
    }
  };
  

exports.calculateSession = async (req, res) => {
    const { sessionId } = req.params; // Only take sessionId from params
    try {
      // Fetch the session to check if it already has a metricsId
      const session = await Sessions.findOne({
        where: { sessionId: sessionId },
      });
  
      if (!session) {
        return res.status(404).json({
          message: `Session not found for sessionId: ${sessionId}`,
        });
      }
  
      // Fetch all session students for the given sessionId from the SessionStudents table
      const sessionStudents = await SessionStudents.findAll({
        where: { sessionId: sessionId },
      });
  
      if (sessionStudents.length === 0) {
        return res.status(404).json({
          message: `No session students found for sessionId: ${sessionId}`,
        });
      }
  
      // Calculate the averages of pretest, posttest, and metricsId for the session
      const totalMetricsId = sessionStudents.reduce(
        (sum, entry) => sum + entry.metricsId,
        0
      );
      const totalPretest = sessionStudents.reduce(
        (sum, entry) => sum + entry.pretest,
        0
      );
      const totalPosttest = sessionStudents.reduce(
        (sum, entry) => sum + entry.posttest,
        0
      );
  
      const avgMetricsId = totalMetricsId / sessionStudents.length; // Average of metricsId
      const avgPretest = totalPretest / sessionStudents.length;
      const avgPosttest = totalPosttest / sessionStudents.length;
  
      // Fetch all metrics entries from the Metrics table using the metricsIds from sessionStudents
      const metricsEntries = await Metrics.findAll({
        where: { metricsId: sessionStudents.map((entry) => entry.metricsId) },
      });
  
      if (metricsEntries.length === 0) {
        return res.status(404).json({
          message: `No metrics found for the sessionId: ${sessionId}`,
        });
      }
  
      // Calculate the average values from the fetched metrics entries
      const totalStickiness = metricsEntries.reduce(
        (sum, entry) => sum + entry.stickiness,
        0
      );
      const totalAvgTimeSpent = metricsEntries.reduce(
        (sum, entry) => sum + entry.avgTimeSpent,
        0
      );
      const totalAttendanceOver30Mins = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceOver30Mins,
        0
      );
      const totalAttendance = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendance,
        0
      );
      const totalCorrectness = metricsEntries.reduce(
        (sum, entry) => sum + entry.correctness,
        0
      );
      const totalAttendanceRate = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceRate,
        0
      );
  
      const avgStickiness = totalStickiness / metricsEntries.length;
      const avgAvgTimeSpent = totalAvgTimeSpent / metricsEntries.length;
      const avgAttendanceOver30Mins = totalAttendanceOver30Mins / metricsEntries.length;
      const avgAttendance = totalAttendance / metricsEntries.length;
      const avgAttendanceRate = totalAttendanceRate / metricsEntries.length;
      const avgCorrectness = totalCorrectness / metricsEntries.length;
  
      // Check if the session already has a metricsId
      if (session.metricsId) {
        // If the session already has a metricsId, update the existing metrics entry
        const existingMetrics = await Metrics.findOne({
          where: { metricsId: session.metricsId },
        });
  
        if (existingMetrics) {
          // Update the existing metrics entry with the calculated averages
          await existingMetrics.update({
            avgPretest,
            avgPosttest,
            stickiness: avgStickiness,
            avgTimeSpent: avgAvgTimeSpent,
            attendanceOver30Mins: avgAttendanceOver30Mins,
            attendance: avgAttendance,
            attendanceRate: avgAttendanceRate,
            correctness: avgCorrectness,
            improvement: "no improvement", // Add improvement logic if needed
            sessionId: sessionId
          });
  
          return res.status(200).json({
            message: "Metrics entry updated successfully",
            metricsId: session.metricsId,
            sessionId: sessionId
          });
        } else {
          return res.status(404).json({
            message: `Metrics entry not found for metricsId: ${session.metricsId}`,
          });
        }
      } else {
        // If the session does not have a metricsId, create a new metrics entry
        const newMetricsId = Math.floor(Math.random() * 900) + 100;
  
        // Create an empty metrics entry first with a new metricsId
        const newMetrics = await Metrics.create({
          metricsId: newMetricsId,
          avgPretest: 0, // Initial values for new metrics
          avgPosttest: 0,
          stickiness: 0,
          avgTimeSpent: 0,
          attendanceOver30Mins: 0,
          attendance: 0,
          attendanceRate: 0,
          correctness: 0,
          improvement: "no improvement", // Add improvement logic if needed
          sessionId: sessionId
        });
  
        // Update the metrics entry with the calculated averages
        await newMetrics.update({
          avgPretest,
          avgPosttest,
          stickiness: avgStickiness,
          avgTimeSpent: avgAvgTimeSpent,
          attendanceOver30Mins: avgAttendanceOver30Mins,
          attendance: avgAttendance,
          attendanceRate: avgAttendanceRate,
          correctness: avgCorrectness,
          improvement: "no improvement",
          sessionId: sessionId
        });
  
        // Update the session with the new metricsId
        await session.update({ metricsId: newMetricsId });
  
        return res.status(201).json({
          message: "Metrics entry created and session updated successfully",
          metricsId: newMetricsId,
        });
      }
    } catch (error) {
      console.error("Error processing request", error);
      return res
        .status(500)
        .json({ message: `Error processing request for sessionId: ${sessionId}` });
    }
  };
  
  exports.calculateClass = async (req, res) => {
    const { classId } = req.params; // Only take classId from params
    try {
      // Fetch the class to check if it already has a metricsId
      const classData = await Classes.findOne({
        where: { classId: classId },
      });
  
      if (!classData) {
        return res.status(404).json({
          message: `Class not found for classId: ${classId}`,
        });
      }
  
      // Fetch all sessions for the given classId from the Sessions table
      const sessions = await Sessions.findAll({
        where: { classId: classId },
      });
  
      if (sessions.length === 0) {
        return res.status(404).json({
          message: `No sessions found for classId: ${classId}`,
        });
      }
  
      // Fetch all metrics entries from the Metrics table using the metricsIds from sessions
      const metricsEntries = await Metrics.findAll({
        where: { metricsId: sessions.map((entry) => entry.metricsId) },
      });
  
      if (metricsEntries.length === 0) {
        return res.status(404).json({
          message: `No metrics found for the classId: ${classId}`,
        });
      }
  
      // Calculate the average values from the fetched metrics entries
      const totalStickiness = metricsEntries.reduce(
        (sum, entry) => sum + entry.stickiness,
        0
      );
      const totalAvgTimeSpent = metricsEntries.reduce(
        (sum, entry) => sum + entry.avgTimeSpent,
        0
      );
      const totalAttendanceOver30Mins = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceOver30Mins,
        0
      );
      const totalAttendance = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendance,
        0
      );
      const totalCorrectness = metricsEntries.reduce(
        (sum, entry) => sum + entry.correctness,
        0
      );
      const totalAttendanceRate = metricsEntries.reduce(
        (sum, entry) => sum + entry.attendanceRate,
        0
      );
  
      const avgStickiness = totalStickiness / metricsEntries.length;
      const avgAvgTimeSpent = totalAvgTimeSpent / metricsEntries.length;
      const avgAttendanceOver30Mins = totalAttendanceOver30Mins / metricsEntries.length;
      const avgAttendance = totalAttendance / metricsEntries.length;
      const avgAttendanceRate = totalAttendanceRate / metricsEntries.length;
      const avgCorrectness = totalCorrectness / metricsEntries.length;
  
      // Check if the class already has a metricsId
      if (classData.metricsId) {
        // If the class already has a metricsId, update the existing metrics entry
        const existingMetrics = await Metrics.findOne({
          where: { metricsId: classData.metricsId },
        });
  
        if (existingMetrics) {
          // Update the existing metrics entry with the calculated averages
          await existingMetrics.update({
            stickiness: avgStickiness,
            avgTimeSpent: avgAvgTimeSpent,
            attendanceOver30Mins: avgAttendanceOver30Mins,
            attendance: avgAttendance,
            attendanceRate: avgAttendanceRate,
            correctness: avgCorrectness,
            improvement: "no improvement", // Add improvement logic if needed
            classId : classId
          });
  
          return res.status(200).json({
            message: "Metrics entry updated successfully",
            metricsId: classData.metricsId,
            classId : classId
          });
        } else {
          return res.status(404).json({
            message: `Metrics entry not found for metricsId: ${classData.metricsId}`,
          });
        }
      } else {
        // If the class does not have a metricsId, create a new metrics entry
        const newMetricsId = Math.floor(Math.random() * 900) + 100;
  
        // Create an empty metrics entry first with a new metricsId
        const newMetrics = await Metrics.create({
          metricsId: newMetricsId,
          stickiness: 0, // Initial values for new metrics
          avgTimeSpent: 0,
          attendanceOver30Mins: 0,
          attendance: 0,
          attendanceRate: 0,
          correctness: 0,
          improvement: "no improvement", // Add improvement logic if needed
          classId : classId
        });
  
        // Update the metrics entry with the calculated averages
        await newMetrics.update({
          stickiness: avgStickiness,
          avgTimeSpent: avgAvgTimeSpent,
          attendanceOver30Mins: avgAttendanceOver30Mins,
          attendance: avgAttendance,
          attendanceRate: avgAttendanceRate,
          correctness: avgCorrectness,
          improvement: "no improvement",
          classId : classId
        });
  
        // Update the class with the new metricsId
        await classData.update({ metricsId: newMetricsId });
  
        return res.status(201).json({
          message: "Metrics entry created and class updated successfully",
          metricsId: newMetricsId,
        });
      }
    } catch (error) {
      console.error("Error processing request", error);
      return res
        .status(500)
        .json({ message: `Error processing request for classId: ${classId}` });
    }
  };
  