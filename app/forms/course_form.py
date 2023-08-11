from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.aws_helpers import ALLOWED_EXTENSIONS_PHOTO, ALLOWED_EXTENSIONS_VIDEO

class CourseForm(FlaskForm):
    name = StringField('Course Name', validators=[DataRequired(message="Name your course!"), Length(min=5, max=255, message="Course name must be between %(min)d and %(max)d characters")])
    description = StringField('Description', validators=[Length(max=255, message="Description must be less than %(max)d characters")])
    # course_image = StringField('course_image', validators=[Length(max=255, message="Image url must be less than %(max)d characters")]) # Make required later
    course_image = FileField("Course Thumbnail Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS_PHOTO))]) # Will this look like I want in error validation -- probably building a whole new thing again?
    price = IntegerField("Price", validators=[DataRequired(), NumberRange(min=0, message="Price must be more than 0")])
    level = StringField("Familiarity Level", validators=[DataRequired(message="Must describe proficiency level")])
    what_youll_learn = StringField("what You'll Learn", validators=[DataRequired(message="Must describe course contract")])
    # course_video = StringField("Course Video", validators=[DataRequired(message="You must include your course!")]) # integrate with aws
    course_video = FileField("Course Video", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS_VIDEO))])
    submit = SubmitField("Submit")
