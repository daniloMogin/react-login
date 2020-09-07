import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from '@material-ui/core';
import { TextField, Select } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const externalSys = ['MIS1', 'MIS2', 'MIS3', 'MIS4', 'Other'];
const connectProtocol = ['Cloud Hotfolder', 'HTTP(s)', 'JDF'];
const workFlowTask = ['Mapping tables', 'Plugged-in code (JAVA)', 'JavaScript'];

const Basic = () => (
    <div className="config-form">
        <h1 className="center-title">Enter configuration</h1>
        <Formik
            initialValues={{
                name: '',
                type: '',
                connProtocol: '',
                workflowTask: '',
            }}
            validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                    errors.name = 'Required';
                }
                if (!values.type) {
                    errors.type = 'Required';
                }
                if (!values.connProtocol) {
                    errors.connProtocol = 'Required';
                }
                if (!values.workflowTask) {
                    errors.workflowTask = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field
                        component={TextField}
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        className="test"
                    />

                    <FormControl className="form-controls">
                        <InputLabel htmlFor="select-system">
                            Select system
                        </InputLabel>
                        <Field
                            component={Select}
                            name="type"
                            inputProps={{
                                id: 'select-system',
                            }}
                            placeholder="Select system"
                        >
                            {externalSys.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                        <ErrorMessage name="type" component="div" />
                    </FormControl>

                    <FormControl className="form-controls">
                        <InputLabel htmlFor="conn-protocol">
                            Select connection protocol
                        </InputLabel>
                        <Field
                            component={Select}
                            name="connProtocol"
                            inputProps={{
                                id: 'conn-protocol',
                            }}
                            placeholder="Select protocol"
                        >
                            {connectProtocol.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                        <ErrorMessage name="connProtocol" component="div" />
                    </FormControl>

                    <FormControl className="form-controls">
                        <InputLabel htmlFor="workflow-task">
                            Workflow task
                        </InputLabel>
                        <Field
                            component={Select}
                            name="workflowTask"
                            inputProps={{
                                id: 'workflow-task',
                            }}
                            placeholder="Select workflow task"
                        >
                            {workFlowTask.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Field>
                        <ErrorMessage name="workflowTask" component="div" />
                    </FormControl>

                    <Button
                        className="form-button"
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
);

export default Basic;
