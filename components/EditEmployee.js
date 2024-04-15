import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import axios from 'axios';
import baseURL from '../auth/connection';

const EditEmployee = ({ employee, isVisible, onClose, onEdit }) => {
    const [editEmployee, setEditEmployee] = useState(employee);

    const handleSaveEdit = async () => {
        try {
            await axios.post(`${baseURL}/api/update`, editEmployee);
            console.log('Updated employee:', editEmployee);
            onEdit(editEmployee); // Update parent component state
        } catch (error) {
            console.error('Error updating employee:', error);
            // Handle error if necessary
        }
        onClose(); // Close the modal after saving
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit Employee Details</Text>
                    {/* Input fields for editing employee details */}
                    <TextInput
                        style={styles.input}
                        placeholder="Employee ID"
                        value={editEmployee?.employee_id || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, employee_id: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={editEmployee?.name || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={editEmployee?.email || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={editEmployee?.phone || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, phone: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Address"
                        value={editEmployee?.address || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, address: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Position"
                        value={editEmployee?.position || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, position: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Salary"
                        value={editEmployee?.salary || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, salary: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Qualification"
                        value={editEmployee?.qualification || ''}
                        onChangeText={(text) => setEditEmployee({ ...editEmployee, qualification: text })}
                    />

                    {/* Save and Cancel buttons */}
                    <Button title="Save" onPress={handleSaveEdit} />
                    <Button title="Cancel" onPress={onClose} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default EditEmployee;
