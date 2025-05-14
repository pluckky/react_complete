import connection from "../config/connectDB.js";
import { checkingCarPlate } from "../validation/parkingValidation.js";


export const parkingZones = (req, res) => {
    connection.query("SELECT DISTINCT zone FROM lot;", (err, data) => {
        if (err) {
            console.log("An error has occurred");
            return res.status(500).json({ error: "Database query failed" });
        }

        // Converts object => array (values only)
        let zones = data.map((key) => key.zone);
        let parkingLots = [];

        // Used Promise.all to handle async operations inside a loop
        // Used to get the parking lots status (name and the number of occupied/vacant) for each zone
        let promises = zones.map((section) => {
            return new Promise((resolve, reject) => {
                connection.query("SELECT zone, parking_status FROM lot WHERE zone = ?", [section], (err, data) => {
                    if (err) {
                        console.log("An error has occurred");
                        reject(err);
                    } else {
                        let vacantNum = data.filter((lot) => lot.parking_status == "vacant").length;
                        let occupiedNum = data.filter((lot) => lot.parking_status == "occupied").length;
                        parkingLots.push({
                            zone: section,
                            vacantNum: vacantNum,
                            occupiedNum: occupiedNum
                        });
                        resolve();
                    }
                });
            });
        });

        Promise.all(promises)
            .then(() => res.json(parkingLots))
            .catch(() => res.json({ error: "Database query failed" }));
    });
}

export const parkingZone = (req, res) => {
    const { zone } = req.params

    connection.query("Select lot_id, zone, parking_status FROM lot WHERE zone = ?", [zone], (err, data) => {
        if (err){
            console.log("An error has occured")
        } else {
            console.log(data);
            res.json(data);
        }
    })
}

export const parkingOverviewAdmin = (req, res) => {
    const {selectedZone} = req.params
    console.log(selectedZone);

    const sqlQuery = "SELECT lot.lot_id, lot.zone, lot.parking_status, parking.user_id, user_information.account_type, vehicle.vehicle_type, vehicle.vehicle_plate, parking.occupied_at " + 
        "FROM lot " +
        "LEFT JOIN parking " + 
            "ON lot.lot_id = parking.lot_id " + 
            "AND lot.zone = parking.zone " +
            "AND parking.vacated_at IS NULL " +
        "LEFT JOIN user_information " +
            "ON parking.user_id = user_information.user_id " +
        "LEFT JOIN vehicle " +
            "ON parking.user_id = vehicle.user_id " +
        "WHERE lot.zone = ?"

    connection.query(sqlQuery, [selectedZone], (err, data) => {
        if (err){
            console.log(err);
            console.log("An error has occured")
        } else {
            console.log(data);
            res.json(data);
        }
    })
}

export const parkVehicle = async (req, res) => {
    console.log("Controllers reached")
    const { lotID, zone, carPlate} = req.body
    
    console.log(carPlate, lotID, zone);
    try {
        const checkingCarPlateResult = await checkingCarPlate(carPlate);

        if (!checkingCarPlateResult.isValid){
            res.json(checkingCarPlateResult)
        } else {
            const sqlQueryInsertParkingValues = [lotID, zone, carPlate, carPlate]
            const sqlQueryInsertParking = "INSERT INTO parking (lot_id, zone, vehicle_plate, user_id) " +
                "SELECT ?, ?, ?, user_id " +
                "FROM vehicle " +
                "WHERE vehicle_plate = ?"
            const sqlQeuryUpdateLotValues = [lotID, zone]
            const sqlQeuryUpdateLot = "UPDATE lot SET parking_status = 'occupied' WHERE lot_id = ? AND  zone = ?"
    
            connection.query(sqlQueryInsertParking, sqlQueryInsertParkingValues, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({isValid: false, message: "Database query failed at inserting parking table values" })
                } else {
                    connection.query(sqlQeuryUpdateLot, sqlQeuryUpdateLotValues, (err, data) => {
                        if (err) {
                            console.log(err);
                            res.json({isValid: false, message: "Database query failed at inserting lot table values" })
                        } else {
                            res.json({isValid: true, message: "A Car has been allocated a parking space" })
                        }
                    })
                }
            })
        }
    } catch {
        console.log("An error has occured while allocating parking space")
    }
}

export const vacatingParkingSpace = (req, res) => {
    const {vehiclePlate } = req.params

    const sqlQueryUpdateLot = "UPDATE lot SET parking_status = 'vacant' WHERE lot.lot_id IN (SELECT parking.lot_id FROM parking WHERE parking.vehicle_plate = ? and vacated_at IS NULL);"
    const sqlQueryUpdateParking = "UPDATE parking " + 
    "SET vacated_at = CURRENT_TIMESTAMP, duration = TIMESTAMPDIFF(MINUTE, occupied_at, CURRENT_TIMESTAMP), admin_out_id = 1 " +
    "WHERE vehicle_plate = ? "

    connection.query(sqlQueryUpdateLot, vehiclePlate, (err, data) => {
        if (err) {
            console.log(err)
            res.json({isValid: false, message: "Database query failed at updating lot table values"})
        } else {
            connection.query(sqlQueryUpdateParking, vehiclePlate, (err, data) => {
                if (err) {
                    console.log(err);
                    res.json({isValid: false, message: "Database query failed at updating parking table values"})
                } else {
                    res.json({isValid: true, message: "A Car has vacated a parking space" })
                }
            })
        }
    })
}