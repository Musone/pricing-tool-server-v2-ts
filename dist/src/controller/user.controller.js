"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyUserHandler = exports.createUserHandler = exports.putUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const mailer_1 = __importDefault(require("../utils/mailer"));
const logger_1 = __importDefault(require("../utils/logger"));
const nanoid_1 = require("nanoid");
const user_model_1 = __importDefault(require("../model/user.model"));
const UpdateAndAddToObject_1 = __importDefault(require("../utils/UpdateAndAddToObject"));
const config_1 = __importDefault(require("config"));
function putUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const input = req.body /*as Partial<User>*/;
        const user = yield user_model_1.default.findById(id);
        if (!user)
            return res.status(400).send('Could not update user');
        (0, UpdateAndAddToObject_1.default)(input, user);
        try {
            yield user.save();
        }
        catch (e) {
            // log.error(e);
            if (e.code === 11000) {
                return res.status(409).send('Email taken');
            }
            else {
                return res.sendStatus(400);
            }
        }
        return res.send('User roles successfully updated');
    });
}
exports.putUserHandler = putUserHandler;
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const clientUrl = config_1.default.get('clientUrl');
        try {
            const user = yield (0, user_service_1.createUser)(body);
            const verificationLink = `${clientUrl}/auth/verify?id=${user._id}&code=${user.verificationCode}`;
            yield (0, mailer_1.default)({
                from: 'admin@server.com',
                to: user.email,
                subject: 'Phare: Please verify your account',
                html: `<h3>Verify you email with the url below</h3><a href={verificationLink}>${verificationLink}</a>`,
            });
            return res.send('User successfully created');
        }
        catch (e) {
            if (e.code === 11000)
                return res.status(409).send('Email already exists');
            return res.status(500).send(e);
        }
    });
}
exports.createUserHandler = createUserHandler;
function verifyUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, verificationCode } = req.params;
        const user = yield (0, user_service_1.findUserById)(id);
        if (!user)
            return res.status(401).send('Could not verify user');
        if (user.verified)
            return res.send('User is already verified');
        if (user.verificationCode === verificationCode) {
            user.verified = true;
            yield user.save();
            return res.send('User successfully verified');
        }
        return res.status(401).send('Verification code invalid');
    });
}
exports.verifyUserHandler = verifyUserHandler;
function forgotPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email } = req.body;
        const message = 'A reset email has been sent';
        const user = yield (0, user_service_1.findUserByEmail)(email);
        const clientUrl = config_1.default.get('clientUrl');
        if (!user) {
            logger_1.default.debug(`User with email ${email} does not exist`);
            return res.send(message);
        }
        if (!user.verified)
            return res.send(message);
        user.passwordResetCode = (0, nanoid_1.nanoid)();
        yield user.save();
        yield (0, mailer_1.default)({
            from: 'admin@server.com',
            to: user.email,
            subject: 'Password reset',
            text: `${clientUrl}/auth/forgotPassword?id=${user._id}&code=${user.passwordResetCode}`
        });
        return res.send(message);
    });
}
exports.forgotPasswordHandler = forgotPasswordHandler;
function resetPasswordHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, passwordResetCode } = req.params;
        const { password } = req.body;
        const user = yield (0, user_service_1.findUserById)(id);
        if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode)
            return res.status(400).send('Could not reset user password');
        user.passwordResetCode = null;
        user.password = password;
        yield user.save();
        return res.send('Password successfully updated');
    });
}
exports.resetPasswordHandler = resetPasswordHandler;
function getCurrentUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.send(res.locals.user);
    });
}
exports.getCurrentUserHandler = getCurrentUserHandler;
