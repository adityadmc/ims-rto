$(document).ready(() => {
    $('#frm').submit((e) => {
        e.preventDefault();
        if (!$("#agree").prop('checked')) {
            alert('Please agree to the age declaration');
        }
        else {
            const username = $('#uid').val().trim();
            console.log(username);
            $.ajax('http://localhost:3001/api/v1.0/users/exists', {
                data: {
                    username
                },
                method: 'post',
                success: (res) => {
                    if (!res.data.userExists) {
                        alert('UIDAI id Not found!');
                        return;
                    }
                    else {
                        $.ajax('http://localhost:3001/api/v1.0/users/isAdult', {
                            data: {
                                username
                            },
                            method: 'post',
                            success: (res) => {
                                if (!res.data.isAdult) {
                                    alert(`You're under age to rent a car`);
                                }
                                else {
                                    const authorityToDrive = $('#authority-to-drive').val();
                                    $.ajax('http://localhost:3001/api/v1.0/users/isAuthorized', {
                                        data: {
                                            authorityToDrive,
                                            username
                                        },
                                        method: 'post',
                                        success: (res) => {
                                            if (!res.data.isAuthorized) {
                                                alert(`You're not authorize to drive ${authorityToDrive}`);
                                            }
                                            else {
                                                alert('Your request would be processed soon');
                                            }
                                        },
                                        error: err => {
                                            alert(err.responseJSON.data.message);
                                        }
                                    });
                                }
                            },
                            error: err => {
                                alert(err.responseJSON.data.message);
                            }
                        });
                    }
                },
                error: err => {
                    alert(err.responseJSON.data.message);
                }
            });
        }
    });
});